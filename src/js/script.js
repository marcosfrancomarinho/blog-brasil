const $ = selector => {
    const element = document.querySelectorAll(selector)
    return element.length > 1 ? element : element[0]
}
window.onload = async () => {
    const response = await fetch("https://api-post-x97k.onrender.com").then(res => res.json())
    response.forEach(data => {
        createModal.bind(data)()
    })
}
$("form").onclick = function (event) {
    event.preventDefault()
    const { title, description } = Object.fromEntries(new FormData(this))
    if (title && description) {
        createModal.bind({ title, description })()
        fetch("https://api-post-x97k.onrender.com", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
    }
}
function createModal() {
    const ID = geratorID()
    $("#group-item").innerHTML +=
        `<div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#a${ID}">
                    ${this.title}
                </button>
            </h2>
            <div id="a${ID}" class="accordion-collapse collapse" data-bs-parent="#group-item">
                <div class="accordion-body">
                ${this.description}
                </div>
            </div>    
        </div>`
}
function geratorID() {
    return Math.random().toString(36).substring(2)
}