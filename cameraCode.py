import os, requests, json, sys
import datetime
import sys
import time
import subprocess

secret_key = 'sk_059a2b0c488c8519f16dc4e2'
publishable_key = 'pk_fb0c4d351e6dc90c21749979'
url = 'https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=in&secret_key=' + secret_key
#url = 'https://test.com'

print("Capturing Image")
sys.stdout.flush()

# read the absolute path
script_dir = os.path.dirname(__file__)
# call the .sh to capture the image
os.system('./webcam.sh')
#get the date and time, set the date and time as a filename.
currentdate = datetime.datetime.now().strftime("%Y-%m-%d_%H%M")
# create the real path
rel_path = currentdate +".jpg"
#  join the absolute path and created file name
abs_file_path = os.path.join(script_dir, rel_path)
print (abs_file_path)
print("Pic Captured")
#print("Enter the path to the image. ", end="")

try:
    #im_path = input().strip()
    im_path = rel_path
    print("impath ",im_path)
    image = open(im_path, "rb")
    files =  {"image": image}
    #print("request sending...")
    r = requests.post(url, files=files)
    #print("response \n")
    resp = json.loads(r.text)
    #print(resp)
    final = json.dumps(resp, indent=4, sort_keys=True)
    #print(final)
    print("plate num :",resp['results'][0]['candidates'][0]['plate'])
    print("accuracy :",resp['results'][0]['candidates'][0]['confidence'])
    number_plate = resp['results'][0]['candidates'][0]['plate']
    data = json.load(open('db.json'))
    # print(data[0])
    flag = 0
    data = json.load(open('db.json'))
    for i in data:
        # print(data[i]['name'])
        if data[i]['name']=='Dock-001':
            for j in data[i]['allowed']:
                print(j)
                if j==number_plate:
                    flag = 1
    if flag==1:
        print("Vehicle is Allow")
    else:
        print("Vehicle is NOT allowed")
    sys.stdout.flush()

except Exception as e:
    print (e)
    print("File not found, exiting")
    sys.stdout.flush()
