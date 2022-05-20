import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addToWishlist, removeFromWishlist, viewWishlist } from "../Actions/wishlishAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom'
const Wishlist = ({ id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert();
    const token = localStorage.getItem("token");
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    console.log("wish",wishlistItems)
    const message = useSelector((state) => state.wishlist.message);
    function Wishlist(id) {
        if (token)
            dispatch(addToWishlist(id));
        else {
            alert.show("Please login to add item to Wishlist", { type: "error" });
            setTimeout(() => {
                history.push("/login");
            }, 2000);

        }


    }
    function RemoveWishlist(id) {
        dispatch(removeFromWishlist(id));



    }
    if (message === "Deleted Successfully")
        window.location.reload();
    return (
        <div class="nt_add_w ts__03 pa">


            {token ?
                <>
                    {wishlistItems?.find(item => item.product._id === id) ?
                        <a href="#" class="wishlistadd cb chp ttip_nt tooltip_right" onClick={() => RemoveWishlist(id)}>
                            <span class="tt_txt">Remove from Wishlist</span>
                            <FavoriteIcon style={{ color: "red" }} />
                        </a>
                        :
                        <a  class="wishlistadd cb chp ttip_nt tooltip_right" onClick={() => Wishlist(id)}>
                            <span class="tt_txt">Add to Wishlist</span>
                            <FavoriteBorderIcon />
                        </a>

                    }
                </> :
                <a href="#" class="wishlistadd cb chp ttip_nt tooltip_right" onClick={() => Wishlist(id)}>
                    <span class="tt_txt">Add to Wishlist</span>
                    <FavoriteBorderIcon />
                </a>
            }



        </div>
    )
}
export default Wishlist