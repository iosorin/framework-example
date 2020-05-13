console.log('Working !')

async function start() {
    return await Promise.resolve();
}
start().then( console.log );