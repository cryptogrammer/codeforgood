import string, math, numpy, sys

fileList=[]
tags = []


def main():

	fileList.append("curriculum.txt")
	fileList.append(sys.argv[1])
	fileList.append("tags.txt")

	# list of tags
	tags = tagList(fileList[2])

	# dictionary conatining word->frequency mapping for all words in 
	masterDictionary = {}
	
	# list of unique words
	unique=[]

	for item in range(2):
		masterDictionary[fileList[item]] = compute(fileList[item])
		TEMP = computeTags(fileList[item], tags)
		for t in TEMP:
			masterDictionary[fileList[item]][t] = TEMP[t]
	# Number of documents to consider for idf
	N = len(fileList) - 1
	
	idf_counter = {}
	
	for file in masterDictionary.keys():
		for word in masterDictionary[file].keys():
			unique.append(word)

	unique = list(set(unique))
	#print(unique)
	numUniqueWords = len(unique)
	#print(numUniqueWords)

	# computing the number of documennts a word  appears in
	for word in unique:
		idf_counter[word]=0
		for file in fileList:
			if(not file == "tags.txt"):
				if(word in masterDictionary[file].keys()):
					idf_counter[word] = idf_counter[word]+1
	#print(idf_counter)

	# Definition of idf(t,D)
	# The value of inverse document frequency for term t in document set D is defined as follows:
	# let N be the number of documents, i.e., |D|
	# let count be the number of documents term t appears in (ranges from 1 to N)
	# idf(t,D) = log(N/count)

	for m in idf_counter.keys():
		#idf_counter[m] = math.log(float(N)/idf_counter[m])
		if(idf_counter[m]==1):
			#print(1)
			idf_counter[m] = 0.000000000001
		else:
			#print(2)
			idf_counter[m] = 0.30
	for file in masterDictionary.keys():
		# maps each word in each file to its tfidf.
		for word in masterDictionary[file].keys():
			if(not word in tags):
			#	print("IF STATEMENT BRO!")
				masterDictionary[file][word] = tf(word,file)*idf_counter[word]
			else:
			#	print("ELSELSELSELSE")
				#print(computeTags(file, tags)[word])
				#print(max(computeTags(file, tags).values()))
				if(not max(computeTags(file, tags).values()) == 0):
					masterDictionary[file][word] = 10*((0.5 + 0.5*(computeTags(file, tags)[word]))/(max(computeTags(file, tags).values()))*idf_counter[word])
				else:
					masterDictionary[file][word] = 0
	#print(sorted(masterDictionary["email.txt"], key=masterDictionary["email.txt"].get, reverse = True))


	# making document Vectors
	documentVectors = {}
	documentVectors[fileList[0]] = []
	documentVectors[fileList[1]] = []
	for w in unique:
		if(masterDictionary[fileList[0]].has_key(w)):
			documentVectors[fileList[0]].append(masterDictionary[fileList[0]][w])
		else:
			documentVectors[fileList[0]].append(0)
		if(masterDictionary[fileList[1]].has_key(w)):
			documentVectors[fileList[1]].append(masterDictionary[fileList[1]][w])
		else:
			documentVectors[fileList[1]].append(0)
	file = open(fileList[1],"r")
	inputString = file.read()
	inputString = str(unicode(inputString, 'ascii', 'ignore'))
	score = (cosine(documentVectors["curriculum.txt"], documentVectors[fileList[1]])*10 + len((inputString.lower()).translate(None, (string.punctuation+"0123456789")))/1000)
	score = 5*score/13
	#print(score)
	if(score > 4.1):
		print(5)
	elif(score >= 3.70 and score < 4.1):
		print(4)
	elif(score >= 3.3 and score < 3.70):
		print(3)
	elif(score < 3.3 and score > 2):
		print(2)
	else:
		print(1)
	#print("HAMMING DISTANCE")
	#print(hamming_distance(documentVectors["curriculum.txt"], documentVectors["email.txt"]))

	#print("Desparate Attempt!")
	#mmm = []
	#for i in range(len(standardScore(documentVectors["curriculum.txt"]))):
#		mmm.append(standardScore(documentVectors["curriculum.txt"])[i] - standardScore(documentVectors["email.txt"])[i])
# 	print(vectorMag(mmm))
	#print(vectorMag(standardScore(documentVectors["curriculum.txt"])))
	#print(vectorMag(standardScore(documentVectors["email.txt"])))

def mean(d1):
	MEAN =0 
	for x in d1:
		MEAN = MEAN + x
	return MEAN/len(d1)
def stdDev(d1):
	k=0
	MEAN = mean(d1)
	for x in d1:
		k = k + math.pow((x-MEAN),2)
	k = k/len(d1)
	return math.sqrt(k)
def standardScore(d1):
	z = []
	MEAN = mean(d1)
	stdDeviation = stdDev(d1)
	for x in d1:
		z.append((x-MEAN)/stdDeviation)
	return z

def hamming_distance(s1, s2):
    #Return the Hamming distance between equal-length sequences
    if len(s1) != len(s2):
        raise ValueError("Undefined for sequences of unequal length")
    return sum(ch1 != ch2 for ch1, ch2 in zip(s1, s2))

def dotProduct(d1,d2):
	answer=0.0
	for i in range(0, len(d1)):
		answer  = answer + d1[i]*d2[i]
	#print(answer)
	return(answer)

def vectorMag(d1):
	answer=0
	for x in d1:
		answer = answer + math.pow(x,2)
	return math.sqrt(answer) 

def cosine(d1, d2):
	return dotProduct(d1,d2)/(vectorMag(d1)*vectorMag(d2))

# Helper function to generate list of tags
def tagList(fileString):
	tags_temp = []
	file = open(fileString,"r")
	inputString = file.read()
	inputString = str(unicode(inputString, 'ascii', 'ignore'))
	for tag in ((inputString.lower()).translate(None, (string.punctuation))).split('0'):
		tags_temp.append(tag)
	return tags_temp

# Helper function
# opens file, makes a dictionary of words in the file mapped
# to their frequency in the file.

def compute(fileString):
	file = open(fileString,"r")
	inputString = file.read()
	inputString = str(unicode(inputString, 'ascii', 'ignore'))
	wordCount = {}
	#print((inputString.lower()).translate(None, (string.punctuation+"0123456789")))
	for x in ((inputString.lower()).translate(None, (string.punctuation+"0123456789"))).split():
			if(wordCount.has_key(x)):
				wordCount[x] = wordCount[x]+1
			else:
				wordCount[x] = 1
	return wordCount

# compute function for tags
def computeTags(fileString, list_of_tags):
	tagCount = {}
	file = open(fileString,"r")
	inputString = file.read()
	inputString = str(unicode(inputString, 'ascii', 'ignore'))
	inputString = (inputString.lower()).translate(None, (string.punctuation+"0123456789"))
	#print("LIST OF TAGS")
	#print(list_of_tags)
	for t in list_of_tags:
		#print(t)
		count = 0
		tempString = inputString
		while(len(tempString)>1):
			#print("in WHILE")
			try:
				index = tempString.index(t)
				count = count + 1
				if(tagCount.has_key(t)):
					tagCount[t] = tagCount[t] + 1
					tempString = tempString[index+len(t):len(tempString)]
				else:
					tagCount[t] = 0
					tempString = tempString[index+len(t):len(tempString)]
				#print(tempString)
			except:
				tagCount[t] = count
				tempString = ""
				break
	#print("tagcount length: " + str(len(tagCount)))
	#print tagCount.values()
	return tagCount



# tf for word t in document d
# Definition of tf(t,d)
# The value of term frequency for term t in document d is defined as follows:
# let count_t be the number of times t occurs in document d
# let max_w be the maximum number of times any word occurs in document d
# tf(t,d) = count_t / max_w

def tf(t,d):
	wordCount = compute(d)
	max_w = max(wordCount.values())
	#print(t)
	#print(wordCount[t])
	return 0.5 +  0.5*wordCount[t]/float(max_w)

def tfTag(t,d):
	#print (str(d))
	#print(str(t))
	tagCount = computeTags(d, tags)
	#print len(tagCount.values())
	max_w = max(tagCount.values())
	#print(t)
	#print(wordCount[t])
	return tagCount[t]/float(max_w)

main()
