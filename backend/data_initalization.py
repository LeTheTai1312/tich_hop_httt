import mysql.connector

try:
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="root"
    )
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE THHTTT")
    mycursor.close()
    mydb.close()
except:
    print("Database DAHTTT is exists")

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="THHTTT"
)

print(mydb)
mycursor = mydb.cursor()

try:
  mycursor.execute("CREATE TABLE biensoxe (idthe INT(32) ,\
  biensoxe VARCHAR(255) ,\
  loai_xe VARCHAR(255), timein VARCHAR(255), timeout VARCHAR(255) primary key (idthe))")
except:
  pass
try:  
  mycursor.execute("CREATE TABLE dangky (id INT(32) ,\
  name VARCHAR(255),IDnumber VARCHAR(255) ,\
  vehicle VARCHAR(255), start VARCHAR(255), outOfDate VARCHAR(255), month INT(32) primary key (id))")
except:
  print("error")
# sql = "UPDATE Subject WHERE subjectId = %s SET  credit=%s, programsemester=%s, schoolId=%s, note=%s)"

