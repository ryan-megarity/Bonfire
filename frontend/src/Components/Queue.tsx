import React from "react";
import { Jumbotron } from "react-bootstrap";

export const Queue = (queue: any) => {
  return (
    <div>
      <Jumbotron fluid className="queue">
        <h4>Queue</h4>
        {queue.length && queue.map((q: any) => <p key={q}>{q}</p>)}
      </Jumbotron>
    </div>
  );
};
