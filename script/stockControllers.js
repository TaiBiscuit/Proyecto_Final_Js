const stockController = async () => {
    const resp = await fetch('./script/stock.json')
    const data = await resp.json()
    
    return data
};

