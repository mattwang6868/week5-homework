export default{
    template:`
    
        <div class="modal-dialog">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{tempProduct.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <div style="height: 250px; background-size: cover; background-position: center;" :style="tempProduct.bgImage">
                </div>
                {{tempProduct.description}}
                </div>
                
                    <div class="p-3">
                        <div v-if="!tempProduct.price">{{tempProduct.origin_price}}</div>
                        <div v-else class="d-flex align-items-baseline justify-content-between">
                            <del class="text-info">原價{{tempProduct.origin_price}}</del>
                            <div class="font-weight-bolder h5 text-danger">現在只要{{tempProduct.price}}</div>
                        </div>
                    </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click = "modalAddToCart">加到購物車</button>
                </div>
            </div>
        </div>
    
    `,
    props:['tempProduct'],
    data(){
        return{
            product:{}
        }
    },
    methods:{
        modalAddToCart(){
            
            this.$emit("modaltocart")
        }
    },
    created(){
        
    }
}