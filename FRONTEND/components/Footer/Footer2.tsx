import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="mainFooter">
            <div className="footerContainer">
                <div className="footerExpandCollapsed">
                    <div className="container">
                        <div className="row1">
                            {/* Cột 1 */}
                            <div className="widgetFooter col">
                                <h2 className="widgetFooterTitle">Thời trang nữ RUBIES</h2>
                                <div className="widgetFooterContent">
                                    <div className="contentInfo">
                                        <p>
                                            Shop thời trang nữ hàng đầu Việt Nam, mang đến những bộ sưu tập thời trang hiện đại, thanh lịch và quyến rũ, phù hợp với mọi phong cách.
                                        </p>

                                        <ul className="footerNavSocial">
                                            <li>
                                                <Link href="https://www.facebook.com/rubiesin2015" target="_blank" rel="noopener" aria-label="Facebook">
                                                    <Image src="/2.png" alt="Facebook" width={30} height={30} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/" target="_blank" rel="noopener" aria-label="Twitter">
                                                    <Image src="/4.png" alt="Twitter" width={30} height={30} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.instagram.com/rubiesvn/" target="_blank" rel="noopener" aria-label="Instagram">
                                                    <Image src="/3.png" alt="Instagram" width={30} height={30} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.youtube.com/shorts/pP9tVWOSDGE" target="_blank" rel="noopener" aria-label="Youtube">
                                                    <Image src="/5.png" alt="Youtube" width={30} height={30} />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="footerPayment">
                                            <div className="paymentTitle">Phương thức thanh toán</div>
                                            <ul className="paymentIcon">
                                                <Image
                                                    src="/Icon1.png"
                                                    alt="Miễn phí vận chuyển"
                                                    width={58}
                                                    height={35}
                                                />
                                                <Image
                                                    src="/Icon3.png"
                                                    alt="Miễn phí vận chuyển"
                                                    width={58}
                                                    height={35}
                                                />
                                                <Image
                                                    src="/Icon4.png"
                                                    alt="Miễn phí vận chuyển"
                                                    width={50}
                                                    height={50}
                                                />
                                                <Image
                                                    src="/Icon2.png"
                                                    alt="Miễn phí vận chuyển"
                                                    width={50}
                                                    height={50}
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cột 2 */}
                            <div className="widgetFooter col">
                                <h2 className="widgetFooterTitle">Liên hệ</h2>
                                <div className="widgetFooterContent">

                                    <li>
                                        <Link href="mailto:contact@torano.vn" aria-label="Email">
                                            Email: contact@rubies.vn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="tel:+84123456789" aria-label="Phone">
                                            Phone: +84 123 456 789
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.google.com/maps" target="_blank" aria-label="Address">
                                            Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM
                                        </Link>
                                    </li>
                                </div>
                            </div>

                            {/* Cột 3 */}
                            <div className="widgetFooter col">
                                <h2 className="widgetFooterTitle">Dịch vụ</h2>
                                <div className="widgetFooterContent">
                                    <ul>
                                        <li>
                                            <Link href="https://www.wear.com.vn/chinh-sach-van-chuyen">Chính sách vận chuyển</Link>
                                        </li>
                                        <li>
                                            <Link href="https://marc.com.vn/pages/chi-nh-sa-ch-do-i-tra-ha-ng-va-hoa-n-tie-n">Chính sách đổi trả</Link>
                                        </li>
                                        <li>
                                            <Link href="https://bizfly.vn/techblog/dich-vu-khach-hang.html">Dịch vụ khách hàng</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Cột 4 */}
                            <div className="widgetFooter col">
                                <h2 className="widgetFooterTitle">Thông tin công ty</h2>
                                <div className="widgetFooterContent">
                                    <ul>
                                        <li>
                                            <Link href="https://www.kingston.com/vn/company/who-we-are">Giới thiệu về chúng tôi</Link>
                                        </li>
                                        <li>
                                            <Link href="/careers">Cơ hội nghề nghiệp</Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">Chính sách bảo mật</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="footer-copyright">
                <div className="container">
                    <p>Copyright © 2024 <a href="https://torano.vn"> hatruongdev@gmail.com </a>.
                        <a target="_blank" href="https://www.haravan.com" rel="noreferrer">  by HaTruongcoder </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
