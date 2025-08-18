import Product from "../Models/product-models";

export class ProductService {
    constructor() {
    }

    async createProduct(
        name : string ,
        description : string ,
        price : number ,
        stock : number ,
        category : string ,
        brand : string ,
        image  : string
    ) {

        if(!name || !description || !price || !stock || !category || !brand  || !image) {
            throw  {
                status : 400,
                message : 'Please provide all required data !!!!'
            }
        }

        const newProduct = new  Product({name , description , price , stock, category , brand , image}) ;

        await  newProduct.save()

        return newProduct ;

    }

    async updateProduct(
        productId : string,
        name : string ,
        description : string ,
        price : number ,
        stock : number ,
        category : string ,
        brand : string ,
        image  : string
    ) {

        if(!name || !description || !price || !stock || !category || !brand  || !image) {
            throw  {
                status : 400,
                message : 'Please provide all required data !!!!'
            }
        }

       const product = await Product.findOneAndUpdate({ _id: productId }, {
           name , description , price, stock , category , brand, image
       } , {new : true})


        if (!product) {
            throw { status: 404, message: 'Product not found' };
        }

        return product ;

    }


    async getProductList(filter:any , sortOption:any , skip:any , limit:any) {
        const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit);

        return products
    }

    async deleteProduct(id : string) {
        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            throw  {
                status : 400,
                message : 'Product not found'
            }
        }

        return product

    }
}