import streamlit as st
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


if 'tower2_finishing' not in st.session_state:
    st.session_state.tower2_finishing = ""
# ----- Load and Parse the .txt File -----
@st.cache_data
def load_conversations(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    dialogues = re.findall(r'User: (.*?)\nBot: (.*?)(?=\nUser:|\Z)', text, re.DOTALL)
    questions = [user.strip() for user, _ in dialogues]
    answers = [bot.strip() for _, bot in dialogues]
    return questions, answers


def UpdateModel(user, answer):
    f = open("phisingdataset.txt","a")
    f.write("\n")
    f.write("\n")
    f.write(f"User:{user}")
    f.write("\n")
    f.write(f"Bot:{answer}")
    f.close()

# ----- Bot Class -----
class SimpleRetrievalBot:
    def __init__(self, questions, answers):
        self.questions = questions
        self.answers = answers
        self.vectorizer = TfidfVectorizer()
        self.X = self.vectorizer.fit_transform(questions)

    def get_response(self, user_input):
        user_vec = self.vectorizer.transform([user_input])
        similarity = cosine_similarity(user_vec, self.X)
        best_match = similarity.argmax()
        score = similarity[0, best_match]
        if score > 0.3:
            return self.answers[best_match]
        else:
            return "I'm not sure. Could you rephrase or ask something else?"

# ----- Load Data and Create Bot -----
file_path = "phisingdataset.txt"  # Replace with your actual file name
questions, answers = load_conversations(file_path)
bot = SimpleRetrievalBot(questions, answers)

check = False

# ----- Streamlit UI -----
# st.set_page_config(page_title="Phishing-Aware AI", layout="centered")

st.title("🛡️ Phishing-Aware AI")
st.write("Ask questions related to suspicious emails, links, or messages.")

# Chat interface
user_input = st.text_input("You:", "")

if st.button("Ask"):
    response = bot.get_response(user_input)
    st.markdown(f"**🤖 Bot:** {response}")

if st.feedback("thumbs") == False:
    check = True
    if check:
        update_response = st.text_input("Tell me something that i want to update")
        if st.button("Update"):
            UpdateModel(user_input, update_response)
            check = False

