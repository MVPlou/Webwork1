export default () => {

    const posts = [
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Crosswordle",
            img: "https://i.postimg.cc/njhjFhBF/crosswordle.png",
            href: "javascript:void(0)"
        },
        {
            title: "Gamedle",
            img: "https://i.postimg.cc/V5Trw16w/Gamedle.png",
            href: "javascript:void(0)"
        },
        {
            title: "Moviedle",
            img: "https://i.postimg.cc/zbvvmPY3/moviedle.png",
            href: "javascript:void(0)"
        },
        {
            title: "Spellie",
            img: "https://i.postimg.cc/0z1z6fDH/Spellie.png",
            href: "javascript:void(0)"
        },
        {
            title: "Squirdle",
            img: "https://i.postimg.cc/4Yvmp914/squirdle.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        },
        {
            title: "Foodle",
            img: "https://i.postimg.cc/kGdtj9tm/FOODLE.png",
            href: "javascript:void(0)"
        }
    ]
    
    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl  lg:px-8">
            <div className="text-center">
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:justify-self-center lg:grid-cols-3 ">
                {
                    posts.map((items, key) => (
                        <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm bg-white" key={key}>
                            <a href={items.href}>
                                <img src={items.img} loading="lazy" alt={items.title}  className="h-[300px] w-[300px] rounded-t-md items-center " />
                                <div className="flex items-center mt-2 ml-4 mr-2 ">
                                </div>
                                <div className=" ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-center font-play">
                                        {items.title}
                                    </h3>
                                    <p className="text-black-400 text-sm mt-1 ">{items.desc}</p>
                                </div>
                            </a>
                
                        </article>
                    ))
                }

            </div>

        </section>

    )
    
}
