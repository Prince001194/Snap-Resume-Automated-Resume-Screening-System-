import glob
import os
import warnings
import textract
import PyPDF2

from train_model import predictLabel

warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')

import re
import fitz



def getfilepath(loc):
    temp = str(loc)
    temp = temp.replace('\\', '/')
    return temp


def res(id=""):
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
    # LIST_OF_FILES.remove("antiword.exe")
    print("This is LIST OF FILES")
    print(LIST_OF_FILES)
    pages = 1
    # print("Total Files to Parse\t" , len(LIST_OF_PDF_FILES))
    print("####### PARSING ########")
    for nooo,i in enumerate(LIST_OF_FILES):
        Ordered_list_Resume.append(i)
        Temp = i.split(".")
        if Temp[1] == "pdf" or Temp[1] == "Pdf" or Temp[1] == "PDF":
            try:
                print("This is PDF" , nooo)
                doc = fitz.open(i) # open a document
                pages = len(doc)
                for page in doc: # iterate the document pages
                    page_content = page.get_text()
                    page_content = page_content.replace('\n', ' ')
                    Temp_pdf = str(Temp_pdf) + str(page_content)
                Resumes.extend([Temp_pdf])
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
                c = [b]
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
                c = [b]
                Resumes.extend(c)
            except Exception as e: 
                print(e)
                Resumes.extend([""])
                    
                
        if Temp[1] == "ex" or Temp[1] == "Exe" or Temp[1] == "EXE":
            print("This is EXE" , i)
            pass



    print("Done Parsing.")
    os.chdir('../../../')


    web_return = []
    for resume_text,name in zip(Resumes,LIST_OF_FILES):
        resume_score = 0

        suggestions = []
        pluspoints = []

        ### Predicting Whether these key points are added to the resume
        if 'Objective' or 'Summary' or 'SUMMARY' or 'OBJECTIVE' in resume_text:
            resume_score = resume_score+6
            pluspoints.append('''Awesome! You have added Objective/Summary''')
            
        else:
            suggestions.append('''Please add your career objective, it will give your career intension to the Recruiters.''')

        if 'Education' or 'School' or 'College' or 'EDUCATION' or 'SCHOOL'  in resume_text:
            resume_score = resume_score + 12
            pluspoints.append('''Awesome! You have added Education Details''')
            
        else:
            suggestions.append('''Please add Education. It will give Your Qualification level to the recruiter''')

        if 'EXPERIENCE' in resume_text:
            resume_score = resume_score + 16
            pluspoints.append('''Awesome! You have added Experience''')
            
        elif 'Experience' in resume_text:
            pluspoints.append('''Awesome! You have added Experience''')
            resume_score = resume_score + 16
            
        else:
            suggestions.append('''Please add Experience. It will help you to stand out from crowd''')

        if 'INTERNSHIPS'  in resume_text:
            pluspoints.append('''Awesome! You have added Internships''')
            resume_score = resume_score + 6
            
        elif 'INTERNSHIP'  in resume_text:
            resume_score = resume_score + 6
            pluspoints.append('''Awesome! You have added Internships''')
            
        elif 'Internships'  in resume_text:
            resume_score = resume_score + 6
            pluspoints.append('''Awesome! You have added Internships''')
            
        elif 'Internship'  in resume_text:
            resume_score = resume_score + 6
            pluspoints.append('''Awesome! You have added Internships''')
            
        else:
            suggestions.append('''Please add Internships. It will help you to stand out from crowd''')

        if 'SKILLS'  in resume_text:
            resume_score = resume_score + 7
            pluspoints.append('''Awesome! You have added Skills''')
            
        elif 'SKILL'  in resume_text:
            pluspoints.append('''Awesome! You have added Skills''')
            resume_score = resume_score + 7
            
        elif 'Skills'  in resume_text:
            pluspoints.append('''Awesome! You have added Skills''')
            resume_score = resume_score + 7
            
        elif 'Skill'  in resume_text:
            pluspoints.append('''Awesome! You have added Skills''')
            resume_score = resume_score + 7
            
        else:
            suggestions.append('''Please add Skills. It will help you a lot''')

        if 'HOBBIES' in resume_text:
            pluspoints.append('''Awesome! You have added Hobbies''')
            resume_score = resume_score + 4
            
        elif 'Hobbies' in resume_text:
            pluspoints.append('''Awesome! You have added Hobbies''')
            resume_score = resume_score + 4
            
        else:
            suggestions.append('''Please add Hobbies. It will show your personality to the Recruiters and give the assurance that you are fit for this role or not.''')

        if 'INTERESTS'in resume_text:
            pluspoints.append('''Awesome! You have added Interests''')
            resume_score = resume_score + 5
            
        elif 'Interests'in resume_text:
            pluspoints.append('''Awesome! You have added Interests''')
            resume_score = resume_score + 5
            
        else:
            suggestions.append('''Please add Interest. It will show your interest other that job.''')

        if 'ACHIEVEMENTS' in resume_text:
            pluspoints.append('''Awesome! You have added Achievements''')
            resume_score = resume_score + 13
            
        elif 'Achievements' in resume_text:
            pluspoints.append('''Awesome! You have added Achievements''')
            resume_score = resume_score + 13
            
        else:
            suggestions.append('''Please add Achievements. It will show that you are capable for the required position.''')

        if 'CERTIFICATIONS' in resume_text:
            pluspoints.append('''Awesome! You have added Certifications''')
            resume_score = resume_score + 12
            
        elif 'Certifications' in resume_text:
            pluspoints.append('''Awesome! You have added Certifications''')
            resume_score = resume_score + 12
            
        elif 'Certification' in resume_text:
            pluspoints.append('''Awesome! You have added Certifications''')
            resume_score = resume_score + 12
            
        else:
            suggestions.append('''Please add Certifications. It will show that you have done some specialization for the required position.''')

        if 'PROJECTS' in resume_text:
            pluspoints.append('''Awesome! You have added Projects''')
            resume_score = resume_score + 19
            
        elif 'PROJECT' in resume_text:
            pluspoints.append('''Awesome! You have added Projects''')
            resume_score = resume_score + 19
            
        elif 'Projects' in resume_text:
            pluspoints.append('''Awesome! You have added Projects''')
            resume_score = resume_score + 19
            
        elif 'Project' in resume_text:
            pluspoints.append('''Awesome! You have added Projects''')
            resume_score = resume_score + 19
            
        else:
            suggestions.append('''Please add Projects. It will show that you have done work related the required position or not.''')




        try:
            web_return.append({
                'resume_name':name,
                'resume_score':resume_score,
                'suggestions':suggestions,
                'pluspoints':pluspoints,
                'pages':pages,
                'predicted_title':predictLabel(resume_text),
            })
        except:
            web_return.append({
                'resume_name':name,
                'resume_score':resume_score,
                'suggestions':suggestions,
                'pluspoints':pluspoints,
                'pages':pages,
                'predicted_title':"N.A.",
            })
    return web_return