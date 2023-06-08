import { withAdmin } from "../../components/withAdmin";
const AdminIndex = ({ user }) => {
  return (
    <div>
      <h1>
        Bienvenido Administrador {user.name} usted es {user.role}
      </h1>
    </div>
  );
};
export const getServerSideProps = withAdmin();
export default AdminIndex;
