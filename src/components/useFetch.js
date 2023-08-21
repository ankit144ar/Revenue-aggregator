import { useEffect, useState } from 'react'

function useFetch() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState(null);

    useEffect(()=>{
        const branches = [1, 2, 3];
        const fetchData = async () => {
            try{
                const response = await Promise.all(branches.map(branch => fetch(`api/branch${branch}.json`)));
                const  productData = await Promise.all( response.map(res => res.json()));

                const combineProduct =  productData.reduce((acc,val)=>{
                    return [...acc,...val.products]
                },[]);

                const temp = combineProduct.reduce((acc,val) => {
                    const exist = acc.find(item => item.name === val.name);
                    const rev =val.unitPrice*val.sold;
                    if(exist){
                        exist.revenue += rev;
                    }
                    else{
                        acc.push({
                            name: val.name,
                            revenue: rev,
                        })
                    }
                    return acc;
                },[]);                
                setProducts(temp);
                setIsLoading(false);
            }catch(error){
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    },[]);
    console.log(JSON.stringify(products));
  return {products, isLoading ,error}; 
}

export default useFetch