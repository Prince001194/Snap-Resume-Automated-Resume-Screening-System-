import glob
import os
import warnings
import textract
# from gensim.summarization import summarize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from werkzeug.utils import secure_filename
from train_model import cleanResume

import fitz # imports the pymupdf library

warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')

os.environ['ANTIWORDHOME'] = "C:/antiword"


class ResultElement:
    def __init__(self, rank, filename):
        self.rank = rank
        self.filename = filename


def getfilepath(loc):
    temp = str(loc)
    temp = temp.replace('\\', '/')
    return temp


def res(jobfile,id=""):
    Resume_Vector = []
    Ordered_list_Resume = []
    Ordered_list_Resume_Score = []
    LIST_OF_FILES = []
    LIST_OF_FILES_PDF = []
    LIST_OF_FILES_DOC = []
    LIST_OF_FILES_DOCX = []
    Resumes = []
    Temp_pdf = []
    os.chdir('./Original_Resumes/'+id)
    for file in glob.glob('**/*.pdf', recursive=True):
        LIST_OF_FILES_PDF.append(file)
    for file in glob.glob('**/*.doc', recursive=True):
        LIST_OF_FILES_DOC.append(file)
    for file in glob.glob('**/*.docx', recursive=True):
        LIST_OF_FILES_DOCX.append(file)

    LIST_OF_FILES = LIST_OF_FILES_DOC + LIST_OF_FILES_DOCX + LIST_OF_FILES_PDF
    print("This is LIST OF FILES")
    print(LIST_OF_FILES)

    print("####### PARSING ########")
    for nooo,i in enumerate(LIST_OF_FILES):
        Ordered_list_Resume.append(i)
        Temp = i.split(".")
        if Temp[1] == "pdf" or Temp[1] == "Pdf" or Temp[1] == "PDF":
            try:
                print("This is PDF" , nooo)
                doc = fitz.open(i) # open a document
                for page in doc: # iterate the document pages
                    page_content = page.get_text()
                    page_content = page_content.replace('\n', ' ')
                    Temp_pdf = str(Temp_pdf) + str(page_content)
                Resumes.extend([cleanResume(Temp_pdf)])
                # a = pdftotext.process(i)
                # a = a.replace(b'\n',  b' ')
                # a = a.replace(b'\r',  b' ')
                # b = str(a)
                # c = [b]
                # print(b)
                # Resumes.extend(c)
                # with open(i,'rb') as pdf_file:
                #     read_pdf = PyPDF2.PdfFileReader(pdf_file)
                    
                #     number_of_pages = read_pdf.getNumPages()
                #     for page_number in range(number_of_pages): 

                #         page = read_pdf.getPage(page_number)
                #         print(page_content)
                #         page_content = page.extractText()
                #         page_content = page_content.replace('\n', ' ')
                #         Temp_pdf = str(Temp_pdf) + str(page_content)
                #     Resumes.extend([Temp_pdf])
                #     Temp_pdf = ''
            except Exception as e: 
                print(e)
                Resumes.extend([""])
        if Temp[1] == "doc" or Temp[1] == "Doc" or Temp[1] == "DOC":
            print("This is DOC" , i)
                
            try:
                a = textract.process(i)
                a = a.replace(b'\n',  b' ')
                a = a.replace(b'\r',  b' ')
                b = str(a)
                c = [cleanResume(b)]
                Resumes.extend(c)
            except Exception as e: 
                print(e)
                Resumes.extend([""])

                
                
        if Temp[1] == "docx" or Temp[1] == "Docx" or Temp[1] == "DOCX":
            print("This is DOCX" , i)
            try:
                a = textract.process(i)
                a = a.replace(b'\n',  b' ')
                a = a.replace(b'\r',  b' ')
                b = str(a)
                c = [cleanResume(b)]
                Resumes.extend(c)
            except Exception as e: 
                print(e)
                Resumes.extend([""])
                    
                
        if Temp[1] == "ex" or Temp[1] == "Exe" or Temp[1] == "EXE":
            print("This is EXE" , i)
            pass



    print("Done Parsing.")
    if id == "":
        os.chdir('../')
    else:
        os.chdir('../../')



    Job_Desc = 0
        
    try:
        f = open("./Job_Description/"+id+"/"+jobfile , 'rb')
        text = f.read()
        tttt = cleanResume(str(text.decode('utf-8')).lower())
        # tttt = summarize(tttt, word_count=100)
        text = [tttt]
    except Exception as e: 
        print(e)
        text = 'None'
    finally:
        # if id == "":
        #     os.chdir('../')
        # else:
        #     os.chdir('../../')
        f.close()



    vectorizer = TfidfVectorizer(stop_words='english')
    vectorizer.fit(text)
    vector = vectorizer.transform(text)

    Job_Desc = vector.toarray()
    for i in Resumes:

        text = i
        tttt = str(text).lower()
        try:
            # tttt = summarize(tttt, word_count=100) 
            # print(text)
            text = [tttt]
            vector = vectorizer.transform(text)

            Resume_Vector.append(vector.toarray())
        except:
            pass

    for i in Resume_Vector:

        samples = i
        neigh = NearestNeighbors(n_neighbors=1)
        neigh.fit(samples) 
        mx = 0
        for tmp in samples[0]:
            if mx<tmp:
                mx = tmp
        if mx<0.1:
            Ordered_list_Resume_Score.extend([1000])
        else:    
            Ordered_list_Resume_Score.extend(neigh.kneighbors(Job_Desc)[0][0].tolist())

    Z = [x for _,x in sorted(zip(Ordered_list_Resume_Score,Ordered_list_Resume))]
    # print(Ordered_list_Resume)
    # print(Ordered_list_Resume_Score)
    flask_return = []
    web_return = []

    for n,i in enumerate(Z):
        name = getfilepath(i)
        rank = n+1
        res = ResultElement(rank, name)
        flask_return.append(res)
        web_return.append(res.filename)
        print(f"Rank{res.rank} :\t {res.filename}")
    return web_return


def saveFiles(id,files): 
    os.makedirs(os.path.dirname("./Original_Resumes/"+id+"/"), exist_ok=True)
    for file in os.listdir("./Original_Resumes/"+id):
        os.chmod(os.path.join("./Original_Resumes/"+id+'/'+file), 0o777)
        os.remove(os.path.join("./Original_Resumes/"+id+'/'+file))                                     
    for file in files:
        filename = secure_filename(file.filename)
        filename = "./Original_Resumes/"+id+"/" + filename
        file.save(filename)

            
def saveJobDesc(id,desc):
    filename = "./Job_Description/"+id+"/Job_Desc.txt"
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(desc)
