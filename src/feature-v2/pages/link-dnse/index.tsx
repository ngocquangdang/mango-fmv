

const LinkDnsePage = () => {
    const handleLinkDnse = () => {
        // Determine the action for the button.
        // For now, maybe just a console log or window alert as placeholder?
        // User only asked for the button to exist.
        console.log("Link DNSE clicked");
        window.location.href = "https://www.dnse.com.vn"; // Helper placeholder
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white gap-4">
            <h1 className="text-black text-2xl font-bold">Liên kết DNSE</h1>
            <button
                onClick={handleLinkDnse}
                className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
                Link DNSE
            </button>
        </div>
    );
};

export default LinkDnsePage;
