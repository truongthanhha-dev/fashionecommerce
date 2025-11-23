import Image from "next/image";

const Footer = () => {
  return (
    <section className="section-home-policy">
      <div className="container">
        <div className=" row">
          {/* Policy Item 1 */}
          <div className="col-xl-3 col-lg-6 col-md-6 col- policy-item">
            <div className="policy-item-inner">
              <div className="policy-item__icon">
                <div className="icon">
                  <Image
                    src="/home_policy_icon_1.png"
                    alt="Miễn phí vận chuyển"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="policy-item-info">
                <h3 className="info-title">Miễn phí vận chuyển</h3>
                <div className="info-des">
                  Áp dụng cho mọi đơn hàng từ 500k
                </div>
              </div>
            </div>
          </div>
          {/* Policy Item 2 */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
            <div className="policy-item-inner">
              <div className="policy-item__icon">
                <div className="icon">
                  <Image
                    src="/home_policy_icon_2.png"
                    alt="Hỗ trợ khách hàng 24/7"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="policy-item-info">
                <h3 className="info-title">Đổi hàng dễ dàng</h3>
                <div className="info-des">7 ngày đổi hàng vì bất kì lí do gì</div>
              </div>
            </div>
          </div>
          {/* Policy Item 3 */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
            <div className="policy-item-inner">
              <div className="policy-item__icon">
                <div className="icon">
                  <Image
                    src="/home_policy_icon_3.png"
                    alt="Thanh toán dễ dàng"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="policy-item-info">
                <h3 className="info-title">Hỗ trợ nhanh chóng</h3>
                <div className="info-des">HOTLINE 24/7 : 0973135577</div>
              </div>
            </div>
          </div>
          {/* Policy Item 4 */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
            <div className="policy-item-inner">
              <div className="policy-item__icon">
                <div className="icon">
                  <Image
                    src="/home_policy_icon_4.png"
                    alt="Đổi trả miễn phí"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="policy-item-info">
                <h3 className="info-title">Thanh toán đa dạng</h3>
                <div className="info-des">
                  Thanh toán khi nhận hàng, Napas, Visa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;