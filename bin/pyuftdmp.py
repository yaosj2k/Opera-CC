#!/usr/bin/env python2
# _*_ coding : utf-8 _*_
'''
Created on Dec 5, 2011

@author: atmouse
'''

from __future__ import print_function ## compatable with python3's print function
import sys,getopt,time
import fnmatch

class opUrlfilter:

    def rmOpHead(self):
        pass
        
    def __init__(self,ofile):
        """ 
        self.f_excl is {line:[item,UUID]} 
        {
        10: ['*/topad.js','84ED8AA0BBAA11E184118BE63775B9D5'], 
        11: ['*/tj.js','A2D5CAA0BBAA11E184129C79AC7D15B3'], 
        12: ['*/tongji.js','AB51BA40BBAA11E1841385553970C10B']
        }
        """
        self.f_excl={}
        self.dump_excl={}
        with open(ofile,'r') as fp:
            line1=fp.readline()
            pos=1
            if line1.find('\xef\xbb\xbf')==0:## deal with the utf8 bom
                line1=line1[3:]
            if "Opera Preferences version 2.1" in line1: ## parse the Opera head format
                while("[exclude]" not in fp.readline()):
                    pos+=1
                pos+=1
            elif line1=="\n" or line1=="\r\n":pass
            else:
                self.f_excl[pos]=line1.rstrip().split("=UUID:")
            for line in fp.readlines(): ##read the context,split UUID
                pos+=1
                if line.find(';')==0:continue
                if line=='\n' or line=='\r\n':continue ## ignore the blank line
                self.f_excl[pos]=line.rstrip().split("=UUID:")
                
    def lsUrllist(self):
        for line in self.f_excl.items():
            print(line)

    def reRep(self):
        """ return the repition list """
        tempList=[]
        tempRepList=[]
        for key,value in self.f_excl.items():
            if value[0] not in tempList:
                self.dump_excl[key]=value[0]
                tempList.append(value[0])
            else:
                tempRepList.append((key,value[0]))
        self.rep=1
        return tempRepList
            
    def reInc(self):
        """ return the inclusion list """
        def recp_cmp(px,x,y): # px:"pos of x"
            for n in px:
                if n not in y:return 0
            return fnmatch.fnmatchcase(y,x)
            
        pop_list=[]
        def pop_key(key):
            if key not in pop_list:
                self.dump_excl.pop(key)
                pop_list.append(key)
                
        tempIncList=[]
        if self.rep==0:print("you must use reRep in code first");return None
        ## dump to two list,one with wild include,another didnt
        wilds={}
        nowilds={}
        for key,item in self.dump_excl.items():
            if '*' in item:
                wilds[key]=item.replace('?','\?')
            else:
                nowilds[key]=item.replace('?','\?')
                
        if wilds:
            wilds_split={i:wilds[i].split('*') for i in wilds}
            wilds_lens={i:len(wilds[i])-wilds[i].count('*') for i in wilds}
            for i,wilds_i in wilds.items():
                wilds_lens_i=wilds_lens[i]
                wilds_spli_i=wilds_split[i]
                if nowilds:
                    for j in nowilds:
                        if recp_cmp(wilds_spli_i,wilds_i,nowilds[j]):
                            tempIncList.append((i,j,wilds_i,nowilds[j]))
                            ## del the nowild inclutions
                            pop_key(j)
                for k in wilds:
                    if wilds_lens_i>wilds_lens[k] or i==k:continue
                    if recp_cmp(wilds_spli_i,wilds_i,wilds[k]):
                        tempIncList.append((i,k,wilds_i,wilds[k]))
                        ## del the wild inclutions
                        pop_key(k)

        return tempIncList
        
    def dumptofile(self,tofile):
        headtext="""\
Opera Preferences version 2.1
; Do not edit this file while Opera is running
; This file is stored in UTF-8 encoding

[prefs]
prioritize excludelist=1

[include]
*

[exclude]
"""
        dump_flist=[str(self.dump_excl[i])+'\n' for i in self.dump_excl.keys()]
        fw=open(tofile,'w')
        fw.write(headtext)
        fw.writelines(dump_flist)
        fw.close()

def usage():
    print(r"Usage: COMMAND [-h] [-t] [-o DUMP2FILE] URLFILTER_FILE")
    print(r"       -h help")
    print(r"       -t output the time cost")
    print(r"       -o write to a new file")
    return 2

def main(argv):
    opts,args=getopt.getopt(sys.argv[1:],"hto:")
    input_file=""
    output_file=""
    timeflags=0
    for op,value in opts:
        if op in ("-h"):
            usage()
            sys.exit()
        if op in ("-t"):
            timeflags=1
        if op in ("-o"):
            output_file=value
    if len(args)!=1:
        usage()
        sys.exit()
    else:
        input_file=args[0]
            
    opurl=opUrlfilter(input_file)
    for n in opurl.reRep():
        print("repetition:",n)
    start_time= time.time()
    for n in opurl.reInc():
        print('inclusion:',n)
    if timeflags:print("Time elapsed:"+str(time.time()-start_time)+'s')
    
    ## write to file
    if bool(output_file):
        opurl.dumptofile(output_file)
        print("dump done!")

    
if __name__ == "__main__":
    main(sys.argv)
