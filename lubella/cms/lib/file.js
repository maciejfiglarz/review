const file = {
    downloadUrl: (fileUrl, name) => {
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('download', name);
        link.href = `http://127.0.0.1:8000/${fileUrl}`;
        link.click();
        link.remove();
    }
}

export default file;