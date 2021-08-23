const prepareData = (data) => {
    let formData = new FormData()
    Object.keys(data).map(key => {
        // console.log(key,data[key],data,key);
        formData.append(key, data[key]);
    })
    return formData;
}

export default prepareData;