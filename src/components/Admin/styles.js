import styled from "styled-components";

export const Container = styled.div`
  margin-top: 60px;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  color: #333;
  margin: 0;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }
  &:hover {
    background: #e9ecef;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

export const TruncatedText = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
