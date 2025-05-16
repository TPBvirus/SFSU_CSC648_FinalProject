# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server IP: 18.118.85.170
2. SSH username: ubuntu
3. SSH key used, in credentials folder. "groupseven.pem"
4. Database IP and Port: 127.0.0.1;3306
5. Database username: root
6. Database password: team7
7. Database name (basically the name that contains all your tables): csc648
8. Instructions on how to use the above information. <br>
chmod 600 "/path/to/pem" to bypass private key security <br>
ssh into our server: ssh -i "/path/to/pem" username@serverIP <br>
Connect via workbench via Standard TCP/IP over ssh connection method <br>
SSH Hostname: Server IP <br>
SSH Username: ubuntu <br> 
SSH Key File USED: "/path/to/pem" <br>
MySQL Hostname: Database IP <br>
MySQL Server Port: 3306 <br>
Enter DB password <br>
Connect! <br>
# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
