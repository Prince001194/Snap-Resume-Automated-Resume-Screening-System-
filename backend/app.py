"""
●   A web app to help employers by analysing resumes and CVs, surfacing candidates that best match the position and filtering out those who don't.
●   Used recommendation engine techniques such as KNN, content based filtering for fuzzy matching job description with multiple resumes.

Prerequisites

    Gensim
    Numpy==1.11.3
    Pandas
    Sklearn
    Dash
    Antiwords
    autocorrect




        To Run this code: 
            # python app.py

	And open URL localhost:5000


"""

import warnings
from flask import (Flask, jsonify, request, send_from_directory)
from flask_cors import CORS
from werkzeug.utils import secure_filename
import screen
import analyse
from screen import saveFiles,saveJobDesc

warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')

app = Flask(__name__)
CORS(app,origins=["*"])

app.config.from_object(__name__) # load config from this file , flaskr.py

# Load default config and override config from an environment variable
app.config.update(dict(
    USERNAME='admin',
    PASSWORD='7b4d7a208a333b46acdc9da159e5be7a',
    SECRET_KEY='development key',
))


app.config['UPLOAD_FOLDER'] = 'Original_Resumes/'
app.config['ALLOWED_EXTENSIONS'] = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

class jd:
    def __init__(self, name):
        self.name = name

def getfilepath(loc):
    temp = str(loc).split('\\')
    return temp[-1]
    

@app.route('/resultscreen/<id>' ,  methods = ['POST'])
def resultscreenId(id):
    jobfile = request.form.get('jobDesc')
    files = request.files.getlist('file')
    # print(jobfile)
    # print(id)
    # print(request.files)
    saveFiles(id,files)
    saveJobDesc(id,jobfile)
    try:
        res = {
            'result':screen.res("Job_Desc.txt",id)
        }
        print(res)
        return jsonify(res)
    except:
        return jsonify({'result':["Job Description Too Short"]})

@app.route('/analyse/<id>' ,  methods = ['POST'])
def analyseId(id):
    # jobfile = request.form.get('jobDesc')
    files = request.files.getlist('file')
    id = "user_data/"+id
    saveFiles(id,files)
    # saveJobDesc(id,jobfile)
    try:
        res = {
            'result':analyse.res(id),
        }
        print(res)
        return jsonify(res)
    except:
        print("Error")
        return jsonify({'result':["Error Occured"]})


@app.route('/Original_Resume/<path:filename>')
def custom_static(filename):
    filename = str(filename).split('/')
    filename[-1] = secure_filename(filename[-1])
    filename = "/".join(filename) 
    print(filename)
    return send_from_directory('./Original_Resumes', filename)



if __name__ == '__main__':
   # app.run(debug = True) 
    # app.run('127.0.0.1' , 5000 , debug=True)
    app.run('0.0.0.0' , 5000 , debug=True , threaded=True)
    
