import { ReportsModel } from "./reports.model.js";

export const getDashboardData = async () => {
  const [
    ventas,
    monto,
    productos,
    estados,
    usuarios
  ] = await Promise.all([
    ReportsModel.ventasRealizadas(),
    ReportsModel.montoTotalVendido(),
    ReportsModel.productosMasVendidos(),
    ReportsModel.estadosPedidos(),
    ReportsModel.usuariosRegistrados()
  ]);

  return {
    ventas_realizadas: ventas,
    total_vendido: monto,
    productos_mas_vendidos: productos,
    estados_pedidos: estados,
    usuarios_registrados: usuarios
  };
};
