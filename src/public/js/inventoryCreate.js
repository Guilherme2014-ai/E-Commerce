function link() {
    var isLink = document.getElementById('isLink')

    isLink.innerHTML = `<input type="hidden" name="isLink" value="true">`

    var compChild = document.getElementById('compImg')
    var linkChild = document.getElementById('linkImg')

    compChild.style.opacity = '40%'
    linkChild.style.opacity = '100%'
}
function comp() {
    var isLink = document.getElementById('isLink')

    isLink.innerHTML = `<input type="hidden" name="isLink" value="false">`

    var linkChild = document.getElementById('linkImg')
    var compChild = document.getElementById('compImg')

    linkChild.style.opacity = '40%'
    compChild.style.opacity = '100%'
}