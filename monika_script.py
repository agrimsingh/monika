from astropy.io import ascii
import numpy as np
import scipy
from scipy import stats
import datetime
import time
from time import strftime
import sys

while True:

with open('./test-01.csv','r') as in_file, open('./tiny_mag2.csv','w') as out_file:
    flag = 0
    for line in in_file:
        if (line[0]=="\n"):
            flag=flag+1
        if flag==2:
            if line[0]!="\n":
                processed_line = line.split(",")[0]+","+ line.split(",")[1]+","+line.split(",")[2]+","+line.split(",")[3]+","+line.split(",")[4]+","+line.split(",")[5]+"\n"
                out_file.write(processed_line)

data_dummy = ascii.read("./tiny_mag2.csv")

def convert_time(arr):
    return np.array([((int(((x.split(" ")[1]).split(":")[0]))*60*60) + (int(((x.split(" ")[1]).split(":")[1]))*60)+ (int(((x.split(" ")[1]).split(":")[2])))) for x in np.array(arr)])

def get_time(x):
    return ((int(((x.split(" ")[1]).split(":")[0]))*60*60) + (int(((x.split(" ")[1]).split(":")[1]))*60)+ (int(((x.split(" ")[1]).split(":")[2])))) 

def find_people(curr_time, arr_last_seen, arr_first_seen, arr_mac_address, arr_power):
    mask = np.array(((np.array(arr_last_seen) > (curr_time-35)) & (np.array(arr_power>-70))))
    print (np.count_nonzero(mask), arr_mac_address[mask], arr_first_seen[mask], arr_last_seen[mask])
    sys.stdout.flush()
# (np.array(arr_last_seen)!=np.array(arr_first_seen))

find_people(get_time(strftime("%Y-%m-%d %H:%M:%S")), convert_time(data_dummy['Last time seen']), convert_time(data_dummy['First time seen']),  data_dummy['Station MAC'], np.array(data_dummy['Power'] , dtype=int))

time.sleep(1)