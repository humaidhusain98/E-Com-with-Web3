import React from "react";

function Searchbox() {
  return (
    <div id="nt_search_canvas" class="nt_fk_full dn tl tc_lg">
      <div class="nt_mini_cart flex column h__100">
        <div class="mini_cart_wrap">
          <form
            method="get"
            class="search_header mini_search_frm js_frm_search pr"
            role="search"
          >
            <div class="row">
              <div class="frm_search_input pr oh col">
                <input
                  class="search_header__input js_iput_search"
                  autocomplete="off"
                  type="text"
                  name="q"
                  placeholder="Search for products"
                />
                <button
                  class="search_header__submit js_btn_search use_jsfull hide_  pe_none"
                  type="submit"
                >
                  <i class="iccl iccl-search"></i>
                </button>
              </div>
            </div>
            <i class="close_pp pegk pe-7s-close ts__03 cd pa r__0"></i>
            <div class="ld_bar_search"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Searchbox;
