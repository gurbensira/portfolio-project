const fullImgBox = document.getElementById('fullImgBox');
const fullImg = document.getElementById('fullImg');

function openFullImg(pic) {
    fullImgBox.style.display = 'flex';
    fullImg.src = pic;
}

function closeFullImg() {
    fullImgBox.style.display = 'none';

}