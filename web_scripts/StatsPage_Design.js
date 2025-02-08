document.getElementById('share_button').addEventListener('click', () => {
    var link = window.location.href;
    var shareButton = document.getElementById('share_button');
    var originalText = shareButton.textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            shareButton.textContent = "Ссылка скопирована!";
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    } else {
        var textArea = document.createElement("textarea");
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            shareButton.textContent = "Ссылка скопирована!";
        } catch (err) {
            console.error('Ошибка при копировании текста: ', err);
        }
        document.body.removeChild(textArea);
    }

    setTimeout(() => {
        shareButton.textContent = originalText;
    }, 2000);
});
