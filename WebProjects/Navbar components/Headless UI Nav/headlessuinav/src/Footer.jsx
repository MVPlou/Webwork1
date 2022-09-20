export default () => {

    const footerNavs = [
    
    ]

    return (
        <footer className="text-[#black] bg-white px-4 py-5 max-w-screen-xl mx-auto margin-top 15px bg-transparent
        ">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <p className="leading-relaxed mt-10 text-[15px] shadow-20px">
                    
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item, idx) => (
                        <li className=" hover:text-gray-800">
                            <a key={idx} href={item.href}>
                                { item.name }
                            </a>
                        </li>
                    ))
                }
            </ul>
        </footer>
    )
}
