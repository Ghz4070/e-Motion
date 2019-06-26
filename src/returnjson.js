exports.success = (success) => {
    return {
        "status":"success",
        "result": success
    }
}

exports.error = (err) => {
    return {
        "status": "error",
        "result": err
    }
}