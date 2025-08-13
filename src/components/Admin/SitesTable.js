import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TruncatedText,
  ActionButtons,
} from "./styles";
import { Button } from "../UI/Button";

const SitesTable = ({ sites, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>URL</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <TableRow key={site.id}>
              <TableCell>
                <strong>{site.title}</strong>
              </TableCell>
              <TableCell>
                <TruncatedText>
                  <a
                    href={site.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.siteUrl}
                  </a>
                </TruncatedText>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    background: "#667eea",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                  }}
                >
                  {site.category}
                </span>
              </TableCell>
              <TableCell>
                <TruncatedText>{site.description}</TruncatedText>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() => onEdit(site)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => onDelete(site.id)}
                  >
                    Delete
                  </Button>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default SitesTable;
