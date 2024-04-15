import { Button, Input } from "@nextui-org/react";

export const Footer = () => {
  return (
    <footer
      style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}
      className=" bg-yellow-200 mt-[100px] grid gap-2 min-h-[200px] justify-items-start lg:justify-items-center p-4 "
    >
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold py-4">Almacen.</h2>
        <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
      </div>
      <ul className="flex flex-col gap-2 text-lg">
        <li>Home</li>
        <li>Products</li>
        <li>Car</li>
        <li>Contact</li>
      </ul>
      <ul className="flex flex-col gap-2 text-lg">
        <li>Help</li>
        <li>Payment Options</li>
        <li>Returns</li>
        <li>Privacy Policies</li>
      </ul>
      <div>
        <h3 className="text-2xl">NewsLetter</h3>
        <form className="flex flex-row gap-2">
          <Input type="text" />
          <Button color="primary" variant="shadow">
            Subscribe
          </Button>
        </form>
      </div>
    </footer>
  );
};
