export const FormCreateProduct = () => {
  return (
    <form>
      <label>
        Nombre de producto:
        <input type="text" name="name" />
      </label>
      <label>
        Precio de producto:
        <input type="number" name="price" />
      </label>
      <label>
        Cantidad de producto
        <input type="number" name="amount" />
      </label>
    </form>
  );
};
