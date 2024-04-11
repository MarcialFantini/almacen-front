export default function AboutUsPage() {
  return (
    <section className=" ">
      <article className=" lg:flex lg:flex-row  border-y-2 border-black">
        <header className=" lg:w-full">
          <h2 className=" text-4xl my-12 mx-4">Sobre nosotros</h2>
        </header>
        <main className="my-6 px-4 flex gap-2 flex-col lg:w-full">
          <p className="text-2xl">Nuestra historia</p>
          <h4 className=" text-4xl my-5">nombre de almacén</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus enim, maiores voluptas veniam est delectus ipsum
            quaerat alias dolore, minima laudantium odit eaque culpa odio vel,
            debitis aspernatur amet neque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
          <p>
            Nam at, recusandae officia aperiam voluptas quis amet, enim
            veritatis eaque ullam aspernatur odio inventore! Numquam culpa
            inventore, rerum nobis voluptas iusto?
          </p>
        </main>
      </article>
    </section>
  );
}
