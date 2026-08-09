import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {socials} from "#constants/index.js";
import {WindowControls} from "#components/index.js";

const Contact = () => {
    return (
        <>

            <div className="window-header relative flex items-center justify-center border-b border-neutral-200 px-4 py-3">
                <div className="absolute left-4">
                    <WindowControls target="contact" />
                </div>

                <h2 className="text-sm font-semibold text-neutral-800">
                    Contact Me
                </h2>
            </div>
            <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src="/images/gal1.png"
                        alt="Raunak"
                        className="w-16 h-16 rounded-full border-2 border-neutral-300"
                    />

                    <div>
                        <h3 className="text-2xl font-bold text-neutral-900">
                            Let&apos;s Connect
                        </h3>
                        <p className="text-neutral-600 text-sm">
                            Got an idea, a collaboration, or just want to talk tech?
                        </p>
                        <p> raunakgupta9198@gmail.com</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {socials.map(({ id, bg, icon, text, link }) => (
                        <a
                            key={id}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            style={{ backgroundColor: bg }}
                        >
                            <img src={icon} alt={text} className="w-6 h-6 mb-3" />
                            <p className="font-semibold text-white">{text}</p>
                            <p className="text-white/70 text-sm group-hover:text-white">
                                Open profile →
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </>

    );
};
const ContactWindow = WindowWrapper(Contact,"contact")
export default ContactWindow;
