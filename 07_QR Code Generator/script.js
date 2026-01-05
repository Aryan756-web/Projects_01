let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");

function generateQR() {
    if (qrText.value.trim() !== "") {

        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
            qrText.value;

        imgBox.classList.add("show-img");

        qrText.classList.remove("error-border", "shake");
        qrText.placeholder = "Text or URL";

    } else {

        qrText.classList.add("error-border", "shake");
        qrText.placeholder = "The input field is empty";

        setTimeout(() => {
            qrText.classList.remove("shake");
        }, 300);
    }
}

qrText.addEventListener("input", () => {
    qrText.classList.remove("error-border");
    qrText.placeholder = "Text or URL";
});
