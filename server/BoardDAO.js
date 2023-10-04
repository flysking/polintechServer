const db = require('./dbConnection');
const BoardDTO = require('./BoardDTO');

const CreateBoard = (req, res, next) => {
  const boardData = req.body;

  const query =
    'INSERT INTO polintech.board (board_title, board_content, board_mid, board_category) VALUES (?, ?, ?, ?)';

  if (
    !boardData.board_title ||
    !boardData.board_content ||
    !boardData.board_mid ||
    !boardData.board_category
  ) {
    res.status(400).json({error: '게시글 정보가 누락되었습니다.'});
    return;
  }

  db.query(
    query,
    [
      boardData.board_title,
      boardData.board_content,
      boardData.board_mid,
      boardData.board_category,
    ],
    (error, results) => {
      if (error) {
        console.error('SQL 오류:', error);
        res.status(500).json({error: '데이터베이스 오류가 발생하였습니다.'});
        return;
      }

      res.json({
        success: true,
        board: {
          board_id: results.insertId,
          ...boardData,
        },
      });
    },
  );
};

const getAllBoards = callback => {
  const query = 'SELECT * FROM polintech.board';

  db.query(query, (error, results) => {
    if (error) {
      callback(error, null);
      console.error(error);
      return;
    }

    const boards = results.map(boardData => new BoardDTO(boardData));
    callback(null, boards);
    console.log(boards);
  });
};

module.exports = {
  CreateBoard,
  getAllBoards,
};
