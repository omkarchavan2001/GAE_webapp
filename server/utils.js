
// function to generate response

function createErrorResult(error){
    return {status:'error', error}
}

function createSuccessResult(data){
    return {status:'success', data}
}

function createResult(error,data)
{
    if(error){
        return createErrorResult(error)
    }
    else{
        return createSuccessResult(data)
    }
}

module.exports = {
    createErrorResult,
    createSuccessResult,
    createResult,
}