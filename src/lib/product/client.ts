const Products = {
    add : async (name) => {
        const uri = '/api/products/add';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });
        const res = await resRaw.json();
        return res;
    },

    list : async () => {
        const uri = '/api/products/list';
        const resRaw = await fetch (uri);
        const res = await resRaw.json();
        return res;
    },

    autocomplete: async (searchTerm) => {
        const uri = '/api/products/autocomplete';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchTerm})
        });
        const res = await resRaw.json();
        return res;
    }
}

export default Products;