import TimelineEvent from './TimelineEvent';

const style = {
   width: 400,
}

function TimeLine({ moveCard, day: line, cards }) {
   function mostrar(bool) {
      console.log('Modal disabled')
   }

   const renderCard = ((card, index, day) => {
      return (
        <TimelineEvent
              key={card.id}
              index={index}
              id={card.id}
              text={card.title}
              date={card.date}
              moveCard={moveCard}
              day={day}
              event={card}
            />
      )
    })

   return (<>
      <li className="t-timeline-i">
         <button className="t-timeline-b open-modal" onClick={() => (mostrar(true))}>
            <h3>{line.date.slice(0,2)}</h3>
         </button>

         <ul style={style}>{cards.map((card, i) => renderCard(card, i))}</ul>
      </li>

      {/* <Agregar
         line={line}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         onNewLineAdded={onNewLineAdded}
         mostrarF={() => (mostrar(false))}
      /> */}
   </>)
}

export default TimeLine