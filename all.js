import zh_TW from './zh_TW.js';
import modal from './js/modal.js';

VeeValidate.configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
  });

// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);

// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
VeeValidate.localize('tw', zh_TW);
Vue.component('modal',modal)
Vue.component('loading',VueLoading)

var app = new Vue({
    el:'#app',
    data:{
        products:[],
        tempProduct:{ 
            imageUrl:[],
            bgImage:''
        },
        status: {
            loadingItem: '',
        },
        form:{
            username:'',
            email:'',
            tel:'',
            address:'',
            payment:'',
            message:''
        },
        cart:{},
        cartTotal:0,
        api: {
            
            uuid: '71a05497-9279-4af4-a348-48c8c33eca99',
            path:'https://course-ec-api.hexschool.io/api'
        },
        isLoading:false,

    },
    methods:{
        submitForm(){

        },
        getProducts(){
            this.isLoading = true;
            const url = `${this.api.path}/${this.api.uuid}/ec/products`;
            axios.get(url).then(res=>{
               console.log(res)
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;
                this.isLoading = false;
                
            })
        },
        getCart(){
            this.isLoading = true;
            this.cartTotal = 0;
            const url = `${this.api.path}/${this.api.uuid}/ec/shopping`;
            axios.get(url).then(res=>{
                this.cart = res.data.data;
                this.cart.forEach((item)=>{
                    this.cartTotal += item.product.price * item.quantity;
                })
                this.isLoading = false;
            })
            

        },
        addToCart(id){
            this.isLoading = true;
            this.status.loadingItem = id;           
            const cart = {
                product:id,
                quantity:1,
            }
            const url = `${this.api.path}/${this.api.uuid}/ec/shopping`;
            axios.post(url,cart).then(res=>{
               
                this.getCart()
                this.status.loadingItem = '';
                this.isLoading = false;
            }).catch((error) => {
                this.status.loadingItem = '';
                console.log(error.response.data.errors);
                alert(error.response.data.errors)
                $('#productModal').modal('hide');
                this.isLoading = false;
              });
        },
        modalAddCart(tempId){
            this.isLoading = true;
            this.status.loadingItem = tempId;  
            const cart = {
                product:tempId,
                quantity:1,
            }
            const url = `${this.api.path}/${this.api.uuid}/ec/shopping`;
            axios.post(url,cart).then(res=>{
               
                this.getCart()
                this.status.loadingItem = '';
                $('#productModal').modal('hide'); 
                this.isLoading = false;
            })
        },
        removeAllCartItem(){
            this.isLoading = true;
            const url = ` ${this.api.path}/${this.api.uuid}/ec/shopping/all/product`;
            axios.delete(url).then(res=>{
                
                this.getCart()
                this.cartTotal= 0;
                this.isLoading = false;
            })
        },
        removeCartItem(id){
            
            this.isLoading = true;
            this.status.loadingItem = id;
            const url = ` ${this.api.path}/${this.api.uuid}/ec/shopping/${id}`;
            axios.delete(url).then(res=>{
                
                this.getCart()
                this.isLoading = false;
            })
            
        },
        quantityUpdate(num,id){
            if(num<=0) return;
            {
                this.isLoading = true;
                const url = ` ${this.api.path}/${this.api.uuid}/ec/shopping`
                const cart = {
                    product:id,
                    quantity:num,
                }
                axios.patch(url,cart).then(res=>{
                    this.getCart()
                    this.isLoading = false;
                })
            }
        },
        
        getDetail(id){
           
            this.isLoading = true;
            this.status.loadingItem = id;
            const url = `${this.api.path}/${this.api.uuid}/ec/product/${id}`;
            axios.get(url).then(res=>{
               
               this.tempProduct =res.data.data
               this.tempProduct.bgImage = `background-image:url(${res.data.data.imageUrl})`
               
               $('#productModal').modal('show'); 
               this.status.loadingItem = '';
               this.isLoading = false;
            })
        }

    },
        created(){
        this.getProducts()
        this.getCart()
        
        }
    })