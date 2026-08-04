import {WindowControls} from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf} from "lucide-react";
import {blogPosts} from "#constants/index.js";

const Safari = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />

                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" />
                    <div className="search">
                        <Search className="icon" />
                        <input
                            type="text"
                            placeholder="Search or enter Website name"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />
                </div>
            </div>

            {/* Window content */}
            {/*<div className="blog">*/}
            {/*    <h2>My Developer Blog</h2>*/}

            {/*    <div className="space-y-8 mt-6">*/}
            {/*        {blogPosts.map(({ id, image, title, date, link }) => (*/}
            {/*            <div key={id} className="blog-post flex items-center gap-4">*/}
            {/*                <img src={image} alt={title} className="w-12 h-12" />*/}

            {/*                <div className="content">*/}
            {/*                    <h3>{date}</h3>*/}
            {/*                    <p>{title}</p>*/}
            {/*                    <a href={link} target="_blank" rel="noopener noreferrer">*/}
            {/*                        Check out the full post <MoveRight className="icon-hover"/>*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="blog">
                <h2>My DSA Journey</h2>

                <div className="blog-post">
                    <img src="/codolio.png" alt="Codolio" className="w-10 h-10" />

                    <div className="content">
                        <h3>Codolio Profile</h3>
                        <p>
                            Tracking my DSA progress, solved problems, and coding consistency
                            across platforms.
                        </p>

                        <a
                            href="https://codolio.com/profile/NoobbCoder/problemSolving"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Live Profile <MoveRight className="icon-hover" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
const SafariWindow = WindowWrapper(Safari , "safari");
export default SafariWindow;
