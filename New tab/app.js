// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsIpCo-3LaV_Z6rO-31NeguBH2tWBILJU",
    authDomain: "team-reporter-a52ab.firebaseapp.com",
    projectId: "team-reporter-a52ab",
    storageBucket: "team-reporter-a52ab.appspot.com",
    messagingSenderId: "16121927005",
    appId: "1:16121927005:web:d001beb63b700461ec44b4",
    measurementId: "G-FS58FK9C4H"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);



    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
}

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}


const auth = firebase.auth();
var database = firebase.database();

auth.onAuthStateChanged((user) => {
    if (user) {
        database.ref('users/' + user.uid).update({
            email: user.email,
            lastLoggedInAt: new Date()
        });
        setData(user);
        setMessages();
        document.getElementById("user").innerHTML = user.email;
        document.getElementById("login_box").style.display = "none";
        document.getElementById("welcome_box").style.display = "block";
    } else {
        document.getElementById("login_box").style.display = "block";
        document.getElementById("welcome_box").style.display = "none";
    }
});

const setData = (user) => {
    const databaseRef = database.ref('users/' + user.uid);
    databaseRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const lastLoggedInAt = data.lastLoggedInAt;
        const lastLoggedInSpan = document.getElementById("lastLoggedIn");
        lastLoggedInSpan.innerHTML = lastLoggedInAt;

    });
}
const addStudent = (name, category, member) => {
    students.push({
      name,
      category,
      member,
    });
  
    localStorage.setItem("students", JSON.stringify(students));
  
    return { name, category, member };
  };
  
  const createStudentElement = ({ name, category, member }) => {
    // Create elements
    const studentDiv = document.createElement("div");
    const studentName = document.createElement("h2");
    const studentCategory = document.createElement("p");
    const studentMember = document.createElement("p");
    const addStudents = document.querySelector(".add-students");
    
    // Fill the content
    studentName.innerText = `student name: ${name}`;
    studentCategory.innerText = `Student category:  ${category}`;
    studentMember.innerText = `Student member:  ${member}`;
  
    // Add to the DOM
    studentDiv.append(studentName, studentCategory, studentMember);
    addStudents.appendChild(studentDiv);
  
  
      addStudents.style.display = students.length === 0 ? "none" : "block";
  };
  addStudents.style.display = students.length === 0 ? "none" : "grid";
  
  students.forEach(createStudentElement);
  
  studentForm.onsubmit = (e) => {
    e.preventDefault();
  
    const newStudent = addStudent(StName.value, category.value, member.value);
  
    createStudentElement(newStudent);
  
    StName.value = "";
    category.value = "";
    member.value = "";
  };
  

    