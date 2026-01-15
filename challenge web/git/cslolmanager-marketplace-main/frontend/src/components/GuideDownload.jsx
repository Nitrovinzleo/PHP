import '../styles/GuideDownload.css'
import Footer from "../partials/Footer.jsx";
import Head from "../partials/Head.jsx";

export default function GuideDownload () {
    return (
        <div className="page-wrapper">
            <Head />
            <div className="guide-download-wrapper">
                <div className="guide-download-title-wrapper">
                    <title className="guide-download-title">
                        Guide d'installation cslol-manager
                    </title>
                </div>
                <article className="guide-download">
                    <p className="guide-download-paragraph">Blablabla</p>
                </article>
            </div>
            <Footer />
        </div>
    );
}