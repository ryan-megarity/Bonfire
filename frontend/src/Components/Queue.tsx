import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";

export const Queue = (queue: any) => {
  useEffect(() => {
    console.log("queue: ", queue, queue.queue);
    queue.length && queue.map((q: any) => console.log(q));
  }, [queue]);

  return (
    <div>
      <Jumbotron fluid className="queue">
        <h4>Queue</h4>
        {queue.queue && queue.queue.length &&
          queue.queue.map((q: any) => {
            return (
              <p>
                {q.title} - {q.artist}
              </p>
            );
          })}
      </Jumbotron>
    </div>
  );
};
