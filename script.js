const text = "NFS- your helper in organization    Stay organized, stay yourself";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 1000);
    }
}

typeWriter();