import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import './example.css';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const hourHeight = 60; // px
const dayWidth = 100; // px
const headerHeight = 30; // px
const timeColWidth = 80; // px

export default function Example() {
    const [editMode, setEditMode] = useState(false);
    const [blocks, setBlocks] = useState([]);
    const [savedBlocks, setSavedBlocks] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const snapToGrid = (value, size) => Math.round(value / size) * size;

    const addBlock = () => {
        const newBlock = {
            id: Date.now(),
            x: timeColWidth + dayWidth * 0,
            y: headerHeight + hourHeight * 0,
            width: dayWidth,
            height: hourHeight,
            title: '새 일정',
            color: '#4169e1'
        };
        setBlocks([...blocks, newBlock]);
    };

    const onDragStop = (id, d) => {
        const snappedX = snapToGrid(d.x - timeColWidth, dayWidth) + timeColWidth;
        const snappedY = snapToGrid(d.y - headerHeight, hourHeight) + headerHeight;
        setBlocks(blocks.map(block =>
            block.id === id ? { ...block, x: snappedX, y: snappedY } : block
        ));
    };

    const onResizeStop = (id, dir, ref, delta, position) => {
        const newWidth = snapToGrid(parseInt(ref.style.width, 10), dayWidth);
        const newHeight = snapToGrid(parseInt(ref.style.height, 10), hourHeight);
        const snappedX = snapToGrid(position.x - timeColWidth, dayWidth) + timeColWidth;
        const snappedY = snapToGrid(position.y - headerHeight, hourHeight) + headerHeight;

        setBlocks(blocks.map(block =>
            block.id === id
                ? {
                    ...block,
                    width: newWidth,
                    height: newHeight,
                    x: snappedX,
                    y: snappedY
                }
                : block
        ));
    };

    const handleSave = () => {
        setEditMode(false);
        setSavedBlocks([...blocks]);
    };

    const handleTitleChange = (id, value) => {
        setBlocks(blocks.map(block =>
            block.id === id ? { ...block, title: value } : block
        ));
    };

    const handleColorChange = (id, value) => {
        setBlocks(blocks.map(block =>
            block.id === id ? { ...block, color: value } : block
        ));
    };

    return (
        <div className="timetable-container">
            {editMode ? (
                <>
                    <button onClick={handleSave}>저장하기</button>
                    <button onClick={addBlock}>일정 추가</button>
                </>
            ) : (
                <button onClick={() => setEditMode(true)}>수정하기</button>
            )}

            <div className="timetable-grid-editable">
                <div className="time-column">
                    <div className="corner-cell" />
                    {Array.from({ length: 16 }, (_, i) => (
                        <div key={i} className="time-label">{7 + i}:00</div>
                    ))}
                </div>

                <div className="days-column">
                    {days.map((day, i) => (
                        <div key={day} className="day-label" style={{ width: dayWidth }}>{day}</div>
                    ))}
                </div>

                <div className="grid-background">
                    {Array.from({ length: 16 * 7 }, (_, i) => (
                        <div key={i} className="grid-cell" style={{ width: dayWidth, height: hourHeight }} />
                    ))}
                </div>

                {(editMode ? blocks : savedBlocks).map(block => (
                    <Rnd
                        key={block.id}
                        size={{ width: block.width, height: block.height }}
                        position={{ x: block.x, y: block.y }}
                        bounds=".timetable-grid-editable"
                        dragGrid={[dayWidth, hourHeight]}
                        resizeGrid={[dayWidth, hourHeight]}
                        dragAxis={editMode ? 'both' : 'none'}
                        enableResizing={editMode}
                        disableDragging={!editMode}
                        onDragStop={(e, d) => onDragStop(block.id, d)}
                        onResizeStop={(e, dir, ref, delta, position) =>
                            onResizeStop(block.id, dir, ref, delta, position)
                        }
                        className="block-editable"
                        style={{ backgroundColor: block.color }}
                    >
                        <div className="block-content">
                            {editingId === block.id ? (
                                <input
                                    value={block.title}
                                    onChange={(e) => handleTitleChange(block.id, e.target.value)}
                                    onBlur={() => setEditingId(null)}
                                    onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                                    autoFocus
                                />
                            ) : (
                                <div onClick={() => editMode && setEditingId(block.id)}>
                                    {block.title}
                                </div>
                            )}

                            {editMode && (
                                <input
                                    type="color"
                                    value={block.color}
                                    onChange={(e) => handleColorChange(block.id, e.target.value)}
                                />
                            )}
                        </div>
                    </Rnd>
                ))}
            </div>
        </div>
    );
}
