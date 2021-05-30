exports.getDate = () => {
    return new Date().toLocaleString("en-US", { weekday: 'long', day: 'numeric', month: 'long' })
}
exports.getDay= ()=>{
    return new Date().toLocaleString("en-US",{weekday: 'long'})
}