import codecs,ConfigParser

class operaprefs:
    
    def __init__(self,filename):
        self.filename=filename
        self.config=ConfigParser.SafeConfigParser(allow_no_value=True)
        fp=codecs.open(self.filename,'r','utf-8-sig')
        self.version=fp.readline().split()[-1]
        while 1:
            if fp.read(1)!='[':
                continue
            else:
                fp.seek(fp.tell()-1)
                break
        try:
            self.config.readfp(fp)
        except ConfigParser.ParsingError:
            print('error')
    def getValue():
        pass


#i=operaprefs('profile/operaprefs.ini')
#print(i.config.sections())
#print(i.version)

