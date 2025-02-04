"""empty message

Revision ID: afa894266746
Revises: 891d66de799b
Create Date: 2025-01-17 18:17:53.455361

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'afa894266746'
down_revision = '891d66de799b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('citas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))
        batch_op.drop_column('create_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('citas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('create_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###
